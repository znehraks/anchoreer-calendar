import { Tag } from '../../common/Tag';
import { Typography } from '../../common/Typography';
import { JobFilterMenu } from './JobFilterMenu';
import { JobFilterMenuItem } from './JobFilterMenuItem';
import { JobFilterTags } from './JobFilterTags';

export function JobFilterModal({ open, topOffset }: { open: boolean; topOffset: number | null }) {
  return (
    <div
      className={`absolute top-0 w-full h-96 bg-gray-50 px-8 pt-6 pb-9 flex flex-col gap-4`}
      style={{
        display: open ? 'flex' : 'none',
        transform: `translateY(${(topOffset ?? 0) + 2}px)`,
      }}
    >
      <div className="flex flex-row gap-1">
        <Typography variant="content">직무</Typography>
        <Typography variant="content" className="text-blue-500">
          3
        </Typography>
      </div>
      <div className="flex-1 flex flex-row rounded-md border-2 ">
        <JobFilterMenu>
          <JobFilterMenuItem />
          <JobFilterMenuItem />
          <JobFilterMenuItem />
        </JobFilterMenu>
        <JobFilterMenu>
          <JobFilterMenuItem />
          <JobFilterMenuItem />
          <JobFilterMenuItem />
        </JobFilterMenu>
        <JobFilterTags>
          <Tag>구매</Tag>
          <Tag>자재</Tag>
          <Tag>기타</Tag>
        </JobFilterTags>
      </div>
    </div>
  );
}
