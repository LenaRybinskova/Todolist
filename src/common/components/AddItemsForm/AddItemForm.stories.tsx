import type { Meta, StoryObj } from "@storybook/react";
import { AddItemForm, AddItemFormPropsType } from "common/components/AddItemsForm/AddItemForm";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField/TextField";
import IconButton from "@mui/material/IconButton/IconButton";
import { AddBox } from "@mui/icons-material";
import { action } from "@storybook/addon-actions";
// если будет возвращаться разметка tsx надо расшир истории изменить тоже tsx

const meta: Meta<typeof AddItemForm> = {
  title: "TODOLISTS/AddItemForm",
  component: AddItemForm,
  parameters: { layout: "centered" }, // ститаческие парам для отобр
  tags: ["autodocs"], // авт создаем раздел Docs
  argTypes: {
    // объект, для неявных параметров ( с "?") или ограичивают(расшир) значение некоторых пропсов
    addItem: {
      description: "clicked inside form",
      action: "clicked", //если тут указали экшн то в args{} не указываем
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

//ДЕФОЛТНАЯ история
export const AddItemFormStory: Story = {
  args: {
    /*      addItem: action('Button clicked inside form')*/
  },
};

//скопир просто компон AddItemForm в юзСтейт указали сразу ош
const ErrorAddItemForm = React.memo((props: AddItemFormPropsType) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>("Title is required");

  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItem();
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label="Title"
        helperText={error}
      />
      <IconButton color="primary" onClick={addItem}>
        <AddBox />
      </IconButton>
    </div>
  );
});

//ИСТОРИЯ с ошибкой
export const ErrorAddItemFormStory: Story = {
  // ту тут хуки нельзя исп, пришлось пересоздавать целую компон с ошибкой
  render: () => <ErrorAddItemForm addItem={action("Button clicked inside form")} disabled={false} />,
};

// ИСТОРИЯ с disabled
export const AddItemFormDisabledStory: Story = {
  args: {
    disabled: true,
  },
};

// истории можно писать двумя способами: через функ рендер или созд перем AddItemFormStory и передали объект с аргументами
// action тоже можно двумя способами задавать: либо в argTypes  action: 'clicked' или старый спасоб: в args{addItem: action('Button clicked inside form')}
