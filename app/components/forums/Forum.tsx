import { Form } from "@remix-run/react";
import { HTMLInputTypeAttribute, ChangeEvent, useState } from "react";

export const ForumRemix = ({ children }: ChildProps) => (
    <Form className="w-full" method="post">
        <div className="card flex-shrink-0 w-full h-fit max-w-sm shadow-2xl bg-base-300">
            <div className="card-body">{children}</div>
        </div>
    </Form>
);

export const Forum = ({ children }: ChildProps) => (
    <div className="card flex-shrink-0 w-full h-fit max-w-sm shadow-2xl bg-base-300">
        <div className="card-body">{children}</div>
    </div>
);

export const ForumButton = ({ children, onClick }: ChildProps & { onClick: React.MouseEventHandler<HTMLButtonElement> }) => (
    <div className="form-control mt-6">
        <button className="btn btn-primary" onClick={onClick}>
            {children}
        </button>
    </div>
);

export const ForumDropDown = ({ label, options, setOption }: { label: string; options: Array<string>; setOption: (option: string) => void }) => {
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

type ForumInputProps = {
    onTyping: (e: ChangeEvent<HTMLInputElement>) => void;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    label: string;
    regex?: string;
    name?: string;
};

export const ForumInput = ({ onTyping, type, placeholder, label, regex, name }: ForumInputProps) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                name={name}
                type={type}
                onChange={(e) => onTyping(e)}
                placeholder={placeholder ? placeholder : label}
                className="input input-bordered"
            />
        </div>
    );
};
