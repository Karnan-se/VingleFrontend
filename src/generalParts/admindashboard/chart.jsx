import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart({ data, activeRange, timeRanges, handleRangeChange }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Market Overview</h2>
        <div className="flex gap-2">
          {Object.keys(timeRanges).map((range) => (
            <button
              key={range}
              onClick={() => handleRangeChange(range)}
              className={`px-3 py-1 rounded ${
                activeRange === range
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#FCD34D"
              strokeWidth={2}
              dot={{ stroke: '#FCD34D', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8, fill: '#FCD34D' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
