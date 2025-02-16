const generateData = (days) => {
  return Array.from({ length: days }, (_, i) => ({
    date: `Day ${i + 1}`,
    income: Math.floor(Math.random() * 50000) + 10000
  }));
};

const timeRanges = {
  ALL: 90,
  '1M': 30,
  '6M': 180,
  '1Y': 365,
  YTD: Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24))
};



  const [activeRange, setActiveRange] = useState('ALL');
  const [data, setData] = useState(() => generateData(timeRanges['ALL']));

  const handleRangeChange = (range) => {
    setActiveRange(range);
    setData(generateData(timeRanges[range]));
  };
