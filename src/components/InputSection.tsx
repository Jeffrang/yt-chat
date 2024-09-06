import React from 'react';

interface InputSectionProps {
  input: string;
  disabled: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleKeyUp: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const InputSection: React.FC<InputSectionProps> = ({ input, handleInputChange, handleKeyDown, handleKeyUp, handleSubmit, disabled }) => {
  return (
    <div className="w-full bg-white">
      <form onSubmit={handleSubmit} className="mx-auto mt-4 w-full max-w-lg p-2 mb-8 border border-gray-300 rounded-2xl shadow-xl bg-white">
        <textarea
          disabled={disabled}
          value={input}
          placeholder="Ask anything..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          className="w-full h-20 bg-transparent resize-none rounded border-none focus:outline-none p-2"
          autoFocus
        />
      </form>
    </div>
  );
};

export default InputSection;
