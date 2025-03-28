import { Box, Button, Slider } from '@mantine/core';
import { useCallback, useMemo, useState } from 'react';
import { StimulusParams } from '../../../store/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ScatterplotSlider({ parameters, setAnswer }: StimulusParams<any>) {
  const {
    image, options, feedback, taskId,
  } = parameters;
  const [userAnswer, setUserAnswer] = useState(0);
  const [userFeedback, setUserFeedback] = useState<string | null>();
  const [min, max] = useMemo(() => [Math.min(...options.map((opt: {label: string, value: string}) => opt.value)), Math.max(...options.map((opt: {label: string, value: string}) => opt.value))], [options]);

  const handleCheckAnswer = useCallback(() => {
    setUserFeedback(feedback[userAnswer]);
    setAnswer({
      status: true,
      answers: {
        [taskId]: userAnswer,
      },
    });
  }, [userAnswer, feedback, taskId, setAnswer]);

  return (
    <div>
      <img src={image} style={{ width: 600 }} />
      <div>
        How correlated do you thin the data looks like?
      </div>

      <Slider
        color="blue"
        marks={options}
        step={1}
        max={max}
        min={min}
        value={userAnswer}
        onChange={setUserAnswer}
      />
      <Box mt="lg">
        {userFeedback}
      </Box>

      {feedback && <Button onClick={handleCheckAnswer}>Check Answer</Button>}
    </div>
  );
}

export default ScatterplotSlider;
