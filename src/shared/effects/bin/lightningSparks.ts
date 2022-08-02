import LightningBolt from "@rbxts/lightning-beams";
import { RunService } from "@rbxts/services";

const RNG = new Random();

function randomVectorOffset(v: Vector3, maxAngle: number): Vector3 {
	return CFrame.lookAt(Vector3.zero, v).mul(
		CFrame.Angles(0, 0, RNG.NextNumber(0, 2 * math.pi)).mul(
			CFrame.Angles(math.acos(RNG.NextNumber(math.cos(maxAngle), 1)), 0, 0),
		).LookVector,
	);
}

export class LightningSparks {
	public enabled = true;
	public minSpeed = 4;
	public maxSpeed = 6;
	public minDistance = 3;
	public maxDistance = 6;
	public minPartsPerSpark = 8;
	public maxPartsPerSpark = 10;

	private sparksN = 0;
	private slotTable = new Array<LightningBolt>();

	private connection: RBXScriptConnection | undefined = undefined;

	public constructor(private lightningBolt: LightningBolt, private maxSparkCount = 10) {
		this.connection = RunService.Heartbeat.Connect(() => {
			if (!this.connection?.Connected) return;

			if (this.enabled && this.sparksN < this.maxSparkCount) {
				const bolt = this.lightningBolt as LightningBolt & { _Parts: Array<Part> };

				if (bolt._Parts[0].Parent === undefined) {
					this.destroy();
					return;
				}
				const boltParts = bolt._Parts;
				const boltPartsN = boltParts.size();

				const opaqueParts = [];

				for (const partIdx of $range(1, boltPartsN)) {
					if (boltParts[partIdx - 1].Transparency < 0.3) {
						opaqueParts.push((partIdx - 0.5) / boltPartsN);
					}
				}

				let [minSlot, maxSlot] = [undefined! as number, undefined! as number];

				if (opaqueParts.size() !== 0) {
					[minSlot, maxSlot] = [
						math.ceil(opaqueParts[0] * this.maxSparkCount),
						math.ceil(opaqueParts[opaqueParts.size() - 1] * this.maxSparkCount),
					];
				}

				for (const _ of $range(1, RNG.NextInteger(1, this.maxSparkCount - this.sparksN))) {
					if (opaqueParts.size() === 0) break;

					const availableSlots = new Array<number>();

					for (const slot of $range(minSlot!, maxSlot!)) {
						if (this.slotTable[slot - 1] === undefined) {
							availableSlots.push(slot);
						}
					}
					_;

					if (availableSlots.size() !== 0) {
						const chosenSlot = availableSlots[RNG.NextInteger(1, availableSlots.size()) - 1];
						const tRng = RNG.NextNumber(-0.5, 0.5);
						const chosenT = (chosenSlot - 0.5 + tRng) / this.maxSparkCount;

						let [dist, chosenPart] = [10, 1];

						for (const opaqueIdx of $range(1, opaqueParts.size())) {
							const testDist = math.abs(opaqueParts[opaqueIdx - 1] - chosenT);
							if (testDist < dist) {
								[dist, chosenPart] = [
									testDist,
									math.floor(opaqueParts[opaqueIdx - 1] * boltPartsN + 0.5 + 0.5),
								];
							}
						}

						const part = boltParts[chosenPart - 1];
						type AttachmentData = Partial<WritableInstanceProperties<Attachment>>;

						const [a1, a2] = [identity<AttachmentData>({}), identity<AttachmentData>({})];
						a1.WorldPosition = part.Position.add(part.CFrame.RightVector.mul(part.Size.X).mul(tRng));
						a2.WorldPosition = a1.WorldPosition.add(
							randomVectorOffset(part.CFrame.RightVector, math.pi / 4).mul(
								RNG.NextNumber(this.minDistance, this.maxDistance),
							),
						);
						a1.WorldAxis = a2.WorldPosition.sub(a1.WorldPosition).Unit;
						a2.WorldAxis = a1.WorldAxis;

						const spark = new LightningBolt(
							a1 as Attachment,
							a2 as Attachment,
							RNG.NextInteger(this.minPartsPerSpark, this.maxPartsPerSpark),
						);

						[spark.MinRadius, spark.MaxRadius] = [0, 0.8];
						spark.AnimationSpeed = 0;
						spark.Thickness = part.Size.Y / 2;
						[spark.MinThicknessMultiplier, spark.MaxThicknessMultiplier] = [1, 1];
						spark.PulseLength = 0.5;
						spark.PulseSpeed = RNG.NextNumber(this.minSpeed, this.maxSpeed);
						spark.FadeLength = 0.25;

						const [H, S, V] = Color3.toHSV(part.Color);
						spark.Color = Color3.fromHSV(H, S, V);

						this.slotTable[chosenSlot - 1] = spark;
					}
				}
			}

			let slotsInuse = 0;

			this.slotTable.forEach((v, i) => {
				if ((v as LightningBolt & { _Parts: Array<Part> })._Parts[0].Parent !== undefined) {
					slotsInuse += 1;
				} else this.slotTable[i - 1] = undefined!;
			});

			this.sparksN = slotsInuse;
		});
	}

	public destroy(): void {
		this.connection?.Disconnect();
		this.connection = undefined;
		setmetatable(this, undefined!);
	}
}
