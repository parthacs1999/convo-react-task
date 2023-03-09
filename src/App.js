import Container from "./components/container";
const style = {
  bg: `w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`
}

function App() {
  return (
    <div className={style.bg}>
      <Container />
    </div>
  );
}

export default App;
