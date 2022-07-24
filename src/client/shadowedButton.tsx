import Roact from "@rbxts/roact";
import { withHooks } from "@rbxts/roact-hooked";
import { JsxChild } from "@rbxts/roact/src/jsx";

interface Props {
	name?: string;
	icon?: JsxChild;
	cb?: Callback;
	shadowBg?: Color3;
	bg?: Color3;
	position?: UDim2;
	size?: UDim2;
	text?: string;
	textSize?: number;
	textColour?: Color3;
	font?: Enum.Font;
	anchorPoint?: Vector2;
}

function ShadowedButton(props: Props): Roact.Element {
	return (
		<frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1} ZIndex={1}>
			<textbutton
				Key="Shadow"
				AnchorPoint={props.anchorPoint}
				AutoButtonColor={false}
				BackgroundTransparency={0}
				Font={Enum.Font.SourceSansBold}
				LayoutOrder={1}
				Position={props.position}
				Size={props.size}
				Text={""}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={22}
				BackgroundColor3={props.shadowBg ?? Color3.fromRGB(66, 66, 66)}
			>
				<uicorner Key="Borders" CornerRadius={new UDim(0, 8)} />
				<textbutton
					BackgroundColor3={props.bg}
					Position={new UDim2(0.5, 0, 0, 0)}
					AnchorPoint={new Vector2(0.5, 0)}
					Size={new UDim2(1, 0, 1, -4)}
					Text={props.text ?? ""}
					TextSize={props.textSize}
					TextColor3={props.textColour}
					Event={{
						MouseButton1Click: props.cb,
					}}
				>
					<uicorner Key="Borders" CornerRadius={new UDim(0, 8)} />
					{props.icon}
				</textbutton>
			</textbutton>
		</frame>
	);
}
export default withHooks(ShadowedButton);
