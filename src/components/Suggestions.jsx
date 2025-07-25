// src/components/Suggestions.jsx
const Suggestions = ({ onSuggestionClick }) => {
  const cities = [
    "Viena",
    "Copenhague",
    "Zurique",
    "Vancouver",
    "Genebra",
    "Frankfurt",
    "Osaka",
    "Maceió",
  ];

  return (
    <div className="border-t border-white mt-6 pt-6">
      <h3 className="text-center mb-4 font-bold">
        Ou escolha uma das cidades abaixo:
      </h3>

      {/* Grid de 2 colunas com gap menor */}
      <div className="grid grid-cols-2 gap-2">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => onSuggestionClick(city)}
            // Botões mais compactos com py-2 e text-sm
            className="py-2 rounded-full bg-[#8dd0f5] text-white font-bold opacity-80 hover:opacity-100 transition-opacity text-sm"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
