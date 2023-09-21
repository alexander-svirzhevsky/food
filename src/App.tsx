import Button from "./components/Button/Button";
import Input from "./components/Input/Input";

function App() {
  return (
    <>
      <Button>Order</Button>
      <Button size='lg'>Checkout</Button>
      <Input
        onChange={(e) => console.log(e.target.value)}
        placeholder='Your email'
        labelText='Email'
      />
    </>
  );
}

export default App;
