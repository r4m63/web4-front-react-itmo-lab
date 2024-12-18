import React, {useState} from 'react';
import "./ProfilePage.css"

export default function SignInPage() {
    const [xValue, setXValue] = useState(0);
    const [yValue, setYValue] = useState(0);
    const [r, setR] = useState(5);
    // TODO: сохранять в localstorage (продумать логику сохранения вместе с списком истории попаданий)
    const [points, setPoints] = useState([]); // Сохраняем точки с сервера

    const yValues = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
    const scale = 40; // Масштаб графика, 40

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
        const data = {x: xValue, y: yValue, r: r};
        console.log('Отправка данных:', data);

        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('Token is missing!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/check-point', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({x: xValue, y: yValue, r: r}),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Результат сервера:', result);
                setPoints([...points, {x: xValue, y: yValue, r: r, hit: result.hit}]);
            } else {
                console.error('Ошибка сервера.');
                alert('Ошибка сервера.');
            }
        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Ошибка сети или сервера.');
        }
    };

    const handleClick = async (e) => {
        const svg = e.target.ownerSVGElement || e.target; // SVG
        const point = svg.createSVGPoint();

        // Координаты клика относительно SVG
        point.x = e.clientX;
        point.y = e.clientY;
        // Переводим координаты клика в систему координат SVG
        const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
        console.log(`Координаты клика SVG: X = ${svgPoint.x}, Y = ${svgPoint.y}`);
        // Центр графика
        const centerX = 250; // Центр по оси X
        const centerY = 250; // Центр по оси Y
        // Масштабируем координаты клика в соответствии с графиком
        const xClicked = (svgPoint.x - centerX) / scale;
        const yClicked = (centerY - svgPoint.y) / scale;
        console.log(`Преобразованные координаты: x = ${xClicked}, y = ${yClicked}`);

        try {
            const response = await fetch('http://localhost:8080/check-point', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    x: xClicked,
                    y: yClicked,
                    r: r,
                }),
            });
            const result = await response.json();
            console.log('Ответ от сервера:', result);
            setPoints((prevPoints) => [
                ...prevPoints,
                {
                    x: xClicked,
                    y: yClicked,
                    r: r,
                    hit: result.hit === true || result.hit === 'true',
                },
            ]);
        } catch (error) {
            console.error('Ошибка при отправке данных на сервер:', error);
        }
    };

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
            <svg
                id="graph"
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="500"
                onClick={handleClick} // Обработчик клика
            >
                {/* Рисуем области (треугольник, прямоугольник, круг) */}
                <polygon
                    points={`250,250 ${250 - r * scale},250 250,${250 - (r * scale) / 2}`}
                    fill="#122028"
                    fillOpacity="0.6"
                />
                <rect
                    x={250 - (r * scale) / 2}
                    y="250"
                    width={(r * scale) / 2}
                    height={r * scale}
                    fill="#122028"
                    fillOpacity="0.6"
                />
                <path
                    fill="#122028"
                    fillOpacity="0.6"
                    d={`M 250 250 L ${250 + r * scale} 250 A ${r * scale} ${r * scale} 0 0 0 250 ${250 - r * scale}`}
                />

                {/* Оси */}
                <line x1="0" y1="250" x2="500" y2="250" stroke="#000"/>
                <line x1="250" y1="0" x2="250" y2="500" stroke="#000"/>

                {/* Засечки и подписи */}
                {[...Array(6)].map((_, i) => (
                    <React.Fragment key={i}>
                        {/* Линии и подписи по оси X */}
                        {i !== 0 && (
                            <>
                                <line x1={250 - i * scale} y1="248" x2={250 - i * scale} y2="252" stroke="#000"/>
                                <line x1={250 + i * scale} y1="248" x2={250 + i * scale} y2="252" stroke="#000"/>
                                <text x={250 - i * scale - 5} y="240" fill="#000">
                                    {-i}
                                </text>
                                <text x={250 + i * scale - 5} y="240" fill="#000">
                                    {i}
                                </text>
                            </>
                        )}

                        {/* Линии и подписи по оси Y */}
                        {i !== 0 && (
                            <>
                                <line
                                    x1="248"
                                    y1={250 - i * scale}
                                    x2="252"
                                    y2={250 - i * scale}
                                    stroke="#000"
                                />
                                <line
                                    x1="248"
                                    y1={250 + i * scale}
                                    x2="252"
                                    y2={250 + i * scale}
                                    stroke="#000"
                                />
                                <text x="256" y={250 - i * scale + 5} fill="#000">
                                    {i}
                                </text>
                                <text x="256" y={250 + i * scale + 5} fill="#000">
                                    {-i}
                                </text>
                            </>
                        )}

                        {/* Отображение нуля */}
                        {i === 0 && <text x="256" y="240" fill="#000">0</text>}
                    </React.Fragment>
                ))}

                {/* Стрелки */}
                <polygon points="250,0 255,5 245,5" fill="#000" stroke="#000"/>
                <polygon points="500,250 495,245 495,255" fill="#000" stroke="#000"/>

                {/* Отображаем точки */}
                {points.map((point, index) => (
                    <circle
                        key={index}
                        cx={250 + point.x * scale}
                        cy={250 - point.y * scale}
                        r="4"
                        fill={point.hit ? 'green' : 'red'}
                    />
                ))}
            </svg>

            <div>
                <div className="resultsSection">
                    <table id="resultTable">
                        <thead>
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Результат</th>
                        </tr>
                        </thead>
                        <tbody id="results">
                        {points.map((row, index) => (
                            <tr key={index}>
                                <td>{row.x}</td>
                                <td>{row.y}</td>
                                <td>{row.r}</td>
                                <td>{row.hit ? "Попал" : "Мимо"}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}
