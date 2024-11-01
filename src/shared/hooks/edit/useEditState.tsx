import { useMemo, useState } from "react";

export interface EditProps {
	disabled: boolean;
}

export const useEditState = ({ disabled }: EditProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const editButton = useMemo(
		() => (
			<button onClick={() => setIsEditing(true)} disabled={disabled}>
				Редактировать
			</button>
		),
		[disabled]
	);

	return {
		isEditing,
		setIsEditing,
		editButton,
	};
};
