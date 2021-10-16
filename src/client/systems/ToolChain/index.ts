import { Controller } from "@flamework/core";
import { HashMap, Option, Result } from "@rbxts/rust-classes";
import { Setup } from "@rbxts/yessir";
import { InputMapper } from "../InputMapper";

export type Item = FabricUnits["Melee"];

@Controller({
	loadOrder: 3,
})
export class ToolChain {
	public constructor(private InputMapper: InputMapper) {}

	private slots = HashMap.empty<number, Item>();
	private command_map = HashMap.empty<Item, Callback>();
	private index = 0;
	private last_index = 0;

	public add(item: Item, fn: Callback): this {
		this.last_index += 1;
		this.slots.insert(this.last_index, item);
		this.command_map.insert(item, fn);

		return this;
	}

	public remove(index: number): this {
		this.slots.remove(index);

		return this;
	}

	public get_item_position(item: Item): Option<number> {
		return this.slots.iter().findMap(([k, v]) => {
			if (v === item) {
				return Option.some(k);
			}

			return Option.none();
		});
	}

	public equip(index: number): Result<this, string> {
		if (index === this.index) {
			this.index = 0;
			return Result.ok(this);
		}

		this.index = index;

		return this.slots.get(index).match(
			(item) => {
				this.input_sink(this.command_map.get(item).unwrap(), this.index);
				return Result.ok(this);
			},
			() => {
				return Result.err("s");
			},
		);
	}

	private input_sink(fn: Callback, index: number): Setup {
		return this.InputMapper.on_input.setup((input, mode) => {
			if (mode === Enum.UserInputType.MouseButton1) {
				fn();
			}
		});
	}
}
