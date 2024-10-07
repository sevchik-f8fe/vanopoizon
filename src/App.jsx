function App() {
  return (
    <>
      <div class="Main">
        <h1>Тестовое приложение</h1>
        <img src="{{ url_for('static', filename='bot.png') }}" alt="123" />
        <p>dasfasdfasdf</p>
        <button class="btn">Кнопка</button>
      </div>
    </>
  )
}

export default App
