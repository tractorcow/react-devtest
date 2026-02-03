import { useMemo, useState } from "react";
import { TagInput } from "./TagInput";

type ContactFormState = {
  name: string;
  email: string;
  message: string;
  topics: string[];
  labels: string[];
};

export function ContactForm(): JSX.Element {
  const [state, setState] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
    topics: [],
    labels: [],
  });

  const canSubmit = useMemo((): boolean => {
    return state.name.trim().length > 0 && state.email.trim().length > 0;
  }, [state.name, state.email]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    alert(JSON.stringify(state, null, 2));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={state.name}
          onChange={(e) =>
            setState((s) => ({ ...s, name: e.currentTarget.value }))
          }
        />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={state.email}
          onChange={(e) =>
            setState((s) => ({ ...s, email: e.currentTarget.value }))
          }
        />
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={state.message}
          onChange={(e) =>
            setState((s) => ({ ...s, message: e.currentTarget.value }))
          }
        />
      </div>

      <div className="field">
        <label>Topics</label>
        <TagInput
          defaultTags={["support", "billing"]}
          onChange={(topics) =>
            setState((s) => ({ ...s, topics }))
          }
          placeholder="Add a topic"
        />
      </div>

      <div className="field">
        <label>Labels</label>
        <TagInput
          onChange={(labels) =>
            setState((s) => ({ ...s, labels }))
          }
          placeholder="Add a label"
        />
      </div>

      <button type="submit" disabled={!canSubmit}>
        Submit
      </button>
    </form>
  );
}
