import { Form as Forum } from "@remix-run/react";
import { HTMLInputTypeAttribute, ChangeEvent, useState } from "react";

export const FormRemix = ({ children }: ChildProps) => (
	<Forum className="w-full" method="post">
		<div className="card flex-shrink-0 w-full h-fit max-w-sm shadow-2xl bg-base-300">
			<div className="card-body">{children}</div>
		</div>
	</Forum>
);

export const Form = ({ children }: ChildProps) => (
	<div className="card flex-shrink-0 w-full h-fit max-w-sm shadow-2xl bg-base-300">
		<div className="card-body">{children}</div>
	</div>
);

export const FormButton = ({ children, onClick }: ChildProps & { onClick: React.MouseEventHandler<HTMLButtonElement> }) => (
	<div className="form-control mt-6">
		<button className="btn btn-primary" onClick={onClick}>
			{children}
		</button>
	</div>
);

export const FormDropDown = ({ label, options, setOption }: { label: string; options: Array<string>; setOption: (option: string) => void }) => {
	return (
		<div className="form-control">
			<label className="label">
				<span className="label-text">{label}</span>
			</label>
			<select onChange={(event) => setOption(event.target.value)} className="select select-bordered w-full max-w-xs">
				<option disabled selected>
					{label}
				</option>
				{options.map((option) => {
					return <option>{option}</option>;
				})}
			</select>
		</div>
	);
};

type FormInputProps = {
	onTyping: (e: ChangeEvent<HTMLInputElement>) => void;
	type: HTMLInputTypeAttribute;
	placeholder?: string;
	label: string;
	regex?: string;
	name?: string;
};

export const FormLabel = ({ children }: { children: React.ReactNode }) => {
	return (
		<label className="label">
			<span className="label-text">{children}</span>
		</label>
	);
};

export const FormInput = ({ onTyping, type, placeholder, label, regex, name }: FormInputProps) => {
	return (
		<div className="form-control">
			<label className="label">
				<span className="label-text">{label}</span>
			</label>
			<input name={name} type={type} onChange={(e) => onTyping(e)} placeholder={placeholder ? placeholder : label} className="input input-bordered" />
		</div>
	);
};
