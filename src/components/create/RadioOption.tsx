import { TextArea } from '../ui/TextArea';
import React, {FC, memo} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Option from './Option';


type OwnProps = {
    onRadioSelected: () => void,
    isSlected: boolean,
    text: string,
    optionIndex: number
    onTextChange: (text: string) => void,
    onDelete:() => void,
}
const RadioOption:FC<OwnProps> = ({
  optionIndex,
  isSlected,
  onDelete,
  onRadioSelected,
  onTextChange,
  text
}) => {
  return <div className='flex items-center gap-3'>
    <div onClick={() => {
      onRadioSelected();
    }}>
      <Option optionType='radio' isSelected={isSlected}  />
    </div>
    <TextArea
      value={text}
      placeholder={`Option ${optionIndex + 1}`}
      onChange={(e) => {
        onTextChange(e.target.value);
      }}
      className='bg-transparent line-clamp-none outline-none resize-none  w-full'
    />
    <DeleteIcon className='cursor-pointer' onClick={onDelete} />
  </div>;
};
export default memo(RadioOption);