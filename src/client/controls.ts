export interface Controls {
	equip_soul_1: Enum.KeyCode;
	equip_soul_2: Enum.KeyCode;
	equip_soul_3: Enum.KeyCode;
	jump: Enum.KeyCode;
	strafe_left: Enum.KeyCode;
	strafe_right: Enum.KeyCode;
	m1: Enum.UserInputType;
	interact: Enum.KeyCode;
	toggle_menu: Enum.KeyCode;
	use_ability_1: Enum.KeyCode;
	use_ability_2: Enum.KeyCode;
	use_ability_3: Enum.KeyCode;
	use_ability_4: Enum.KeyCode;
	dash: [Enum.KeyCode, Enum.KeyCode];
	use_block: Enum.KeyCode;
}

export const key = <T extends keyof typeof Enum.KeyCode>(key: T): Enum.KeyCode => Enum.KeyCode[key] as Enum.KeyCode;

export function input_type<T extends keyof Writable<typeof Enum.UserInputType>>(
	key: typeof Enum.UserInputType[T] extends Callback ? never : T,
): Enum.UserInputType {
	return Enum.UserInputType[key] as Enum.UserInputType;
}

export const controls: Controls = {
	equip_soul_1: key("Z"),
	equip_soul_2: key("X"),
	equip_soul_3: key("C"),
	jump: key("Space"),
	strafe_left: key("A"),
	strafe_right: key("D"),
	m1: input_type("MouseButton1"),
	interact: key("E"),
	toggle_menu: key("G"),
	use_ability_1: key("One"),
	use_ability_2: key("Two"),
	use_ability_3: key("Three"),
	use_ability_4: key("Four"),
	dash: [key("Q"), key("E")],
	use_block: key("F"),
};
