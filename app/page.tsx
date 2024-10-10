import Pomodoro from "@/components/pomodoro";

export default function Home() {
  return (
    <div className="w-full h-screen p-2">
      <div className="w-full grid place-content-center h-full border rounded-md">
        <Pomodoro />
      </div>
    </div>
  );
}
