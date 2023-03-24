interface AuthorInformationProps {
  data: any;
  className?: string;
}
export default function AuthorInformation({
  className = 'md:hidden',
  data,
}: AuthorInformationProps) {
  return (
    <div className={`${className}`}>
      {/* Bio */}
      <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          purpose
        </div>
        <div className="text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400">
          {data?.purpose}
        </div>
      </div>

      {/* Social */}
      <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          members
        </div>
        {data?.membersList?.map((member: any) => (
          <div
            className="mb-2 flex items-center gap-x-2 text-sm tracking-tight text-gray-600 transition last:mb-0 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            key={member}
          >
            {member}
          </div>
        ))}
      </div>

      {/* Join date */}
      <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        <div className="text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Joined {data?.creationTime}
        </div>
      </div>
    </div>
  );
}
