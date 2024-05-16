import GeneratePdfForm from "./GeneratePdfForm";

const HomePage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      <h1 className="text-2xl">Generate PDF</h1>
      <GeneratePdfForm />
    </div>
  );
};

export default HomePage;
