import { Paths } from "@/constants/path";
import BufferPage from "@/components/Views/BufferPage";
import { RemoveScheduleIcon } from "@/assets";

const LSRemovedSchedule: React.FC = () => {
  return (
    <BufferPage
      title="The livestream was removed from the system"
      linkRedirect={Paths.LiveStream}
      icon={<RemoveScheduleIcon />}
    />
  );
};

export default LSRemovedSchedule;
