import { useEffect, useMemo, useState } from "react";

export type TagInputProps = {
  defaultTags?: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
};

export function TagInput({
  defaultTags = [],
  onChange,
  placeholder = "Add a tag",
}: TagInputProps): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [currentTags, setCurrentTags] = useState<string[]>([]);

  useEffect(() => {
    setCurrentTags(defaultTags);
  }, [defaultTags]);

  const value = useMemo(() => input.trim(), [input]);

  const addTag = (): void => {
    if (!value) return;
    if (currentTags.includes(value)) return;

    const next = [...currentTags, value];
    setCurrentTags(next);
    onChange(next);
    setInput("");
  };

  const removeTag = (index: number): void => {
    const next = currentTags.filter((_, i) => i !== index);
    setCurrentTags(next);
    onChange(next);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <input
        value={input}
        placeholder={placeholder}
        onChange={(e) => setInput(e.currentTarget.value)}
        onKeyDown={onKeyDown}
      />

      <div className="tagRow">
        {currentTags.map((tag, index) => (
          <span key={`${tag}-${index}`} className="tag">
            {tag}
            <button type="button" onClick={() => removeTag(index)}>
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
