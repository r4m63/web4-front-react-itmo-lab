import React, {useState} from 'react';

export default function SignInPage() {
    const [xValue, setXValue] = useState(0);
    const [yValue, setYValue] = useState(0);
    const [r, setR] = useState(5);
    const [points, setPoints] = useState([]); // Сохраняем точки с сервера

    const yValues = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
    const scale = 40; // Масштаб графика

    const handleXChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value >= -5 && value <= 5) {
            setXValue(Number(value));
        }
    };

    const handleRChange = (event) => {
        setR(parseFloat(event.target.value));
    };

    const handleSubmit = async () => {
        const payload = {x: xValue, y: yValue, r: r};
        console.log('Отправка данных:', payload);

        try {
            const response = await fetch('/api/submit-coordinates', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Результат сервера:', result);

                // Добавляем точку в массив для отображения
                setPoints([...points, {x: xValue, y: yValue, isHit: result.isHit}]);
            } else {
                alert('Ошибка сервера.');
            }
        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Ошибка сети или сервера.');
        }
    };

    // Конвертация координат на графике
    const convertToGraph = (value) => 250 + value * scale;

    return (
        <>
            <h1>Dynamic Graph</h1>

            {/* Управление вводом */}
            <div style={{marginBottom: '20px'}}>
                <div>
                    <label>
                        Введите X (от -5 до 5):
                        <input
                            type="number"
                            value={xValue}
                            onChange={handleXChange}
                            min="-5"
                            max="5"
                            step="1"
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Выберите Y:
                        <select value={yValue} onChange={(e) => setYValue(Number(e.target.value))}>
                            {yValues.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div>
                    <label>
                        <input type="radio" value="1" name="r" onChange={handleRChange}/> R = 1
                    </label>
                    <label>
                        <input type="radio" value="2" name="r" onChange={handleRChange}/> R = 2
                    </label>
                    <label>
                        <input type="radio" value="3" name="r" onChange={handleRChange}/> R = 3
                    </label>
                    <label>
                        <input type="radio" value="4" name="r" onChange={handleRChange}/> R = 4
                    </label>
                    <label>
                        <input type="radio" value="5" name="r" onChange={handleRChange} defaultChecked/> R = 5
                    </label>
                </div>
            </div>

            {/* Кнопка отправить */}
            <button onClick={handleSubmit} style={{padding: '10px 20px', cursor: 'pointer'}}>
                Отправить координаты
            </button>

            {/* SVG график */}
            <svg id="graph" xmlns="http://www.w3.org/2000/svg" width="500" height="500"
                 style={{border: '1px solid black'}}>
                {/* Треугольник */}
                <polygon
                    points={`250,250 ${250 - r * scale},250 250,${250 - (r * scale) / 2}`}
                    fill="#122028"
                    fillOpacity="0.6"
                />

                {/* Прямоугольник */}
                <rect
                    x={250 - (r * scale) / 2}
                    y="250"
                    width={(r * scale) / 2}
                    height={r * scale}
                    fill="#122028"
                    fillOpacity="0.6"
                />

                {/* Четверть круга */}
                <path
                    fill="#122028"
                    fillOpacity="0.6"
                    d={`M 250 250 L ${250 + r * scale} 250 A ${r * scale} ${r * scale} 0 0 0 250 ${250 - r * scale}`}
                />

                {/* Оси */}
                <line x1="0" y1="250" x2="500" y2="250" stroke="#000"/>
                <line x1="250" y1="0" x2="250" y2="500" stroke="#000"/>

                {/* Подписи осей */}
                {[...Array(6)].map((_, i) => (
                    <React.Fragment key={i}>
                        {/* Линии и подписи по оси X */}
                        {i !== 0 && (
                            <>
                                <line x1={250 - i * scale} y1="248" x2={250 - i * scale} y2="252" stroke="#000"/>
                                <line x1={250 + i * scale} y1="248" x2={250 + i * scale} y2="252" stroke="#000"/>
                                <text x={250 - i * scale - 5} y="240" fill="#000">{-i}</text>
                                <text x={250 + i * scale - 5} y="240" fill="#000">{i}</text>
                            </>
                        )}

                        {/* Линии и подписи по оси Y */}
                        {i !== 0 && (
                            <>
                                <line x1="248" y1={250 - i * scale} x2="252" y2={250 - i * scale} stroke="#000"/>
                                <line x1="248" y1={250 + i * scale} x2="252" y2={250 + i * scale} stroke="#000"/>
                                <text x="256" y={250 - i * scale + 5} fill="#000">{i}</text>
                                <text x="256" y={250 + i * scale + 5} fill="#000">{-i}</text>
                            </>
                        )}

                        {/* Отображение единственного нуля */}
                        {i === 0 && (
                            <text x="256" y="240" fill="#000">0</text>
                        )}
                    </React.Fragment>
                ))}


                {/* Отображение точек */}
                {points.map((point, index) => (
                    <circle
                        key={index}
                        cx={convertToGraph(point.x)}
                        cy={convertToGraph(-point.y)} // Инвертируем Y, т.к. SVG направлен вниз
                        r="4"
                        fill={point.isHit ? 'green' : 'red'}
                    />
                ))}
            </svg>
        </>
    );
}
