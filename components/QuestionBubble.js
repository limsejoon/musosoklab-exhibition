export default function QuestionBubble({ questions, selected, onSelect }) {
  return (
    <div className="px-4 py-4">
      <p className="text-xs mb-3" style={{ color: '#888888' }}>질문을 선택하세요</p>
      <div className="flex flex-col gap-2">
        {questions.map((q, i) => {
          const isSelected = selected === q;
          return (
            <button
              key={i}
              onClick={() => onSelect(q)}
              className="text-left px-4 py-3 rounded-2xl text-sm transition-all"
              style={{
                backgroundColor: isSelected ? '#1A1916' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#1A1916',
                border: `1px solid ${isSelected ? '#1A1916' : '#E8E4DC'}`,
              }}
            >
              {q}
            </button>
          );
        })}
      </div>
    </div>
  );
}
