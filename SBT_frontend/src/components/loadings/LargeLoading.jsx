import SmallLoading from './SmallLoading';

export default function LoadingLarge() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-white dark:bg-gray-900">
      <SmallLoading size={60} />
    </div>
  );
}
