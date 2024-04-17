import Tasks from "@/app/tasks/tasks";

export default function Page({ params }: { params: { userID: number } }) {
  return (
    <div className="flex">
      <Tasks />
    </div>
  );
}
