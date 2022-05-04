import { Feedback } from "../../TS/models";
import TaskCard from "./TaskCard";

const Planned: React.FunctionComponent<{ feedbacks: Feedback[] }> = ({
  feedbacks,
}) => {
  return (
    <div>
      <h5 className="font-bold">Planned ({feedbacks.length})</h5>
      <span className="text-sm text-secondary text-opacity-80">
        Ideas prioritized for research
      </span>

      {feedbacks.map((feedback) => (
        <TaskCard
          key={feedback.id}
          id={feedback.id}
          title={feedback.title}
          description={feedback.description}
          category={feedback.category}
          type={feedback.type}
          likes={feedback.likes}
          likedBy={feedback.likedBy}
          comments={feedback.comments}
        />
      ))}
    </div>
  );
};

export default Planned;
