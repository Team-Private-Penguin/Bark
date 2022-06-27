import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';

const Groups = () => {
  const [opened, setOpened] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');


  const handleChange1 = (event) => {
    setInput1(event.target.value);
  }

  const handleChange2 = (event) => {
    setInput2(event.target.value);
  }

  const handleChange3 = (event) => {
    setInput3(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input1);
    console.log(input2);
    console.log(input3);
  }

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create group?"
        className="groupModal"
        styles={{
          modal: { color: 'black' }
        }}
      >
        {
          <form onSubmit={handleSubmit}>
            <label>
              Form 1&nbsp;
              <input type="text" value={input1} onChange={handleChange1} />
              </label><br></br>

              <label>
              Form 2&nbsp;
              <input type="text" value={input2} onChange={handleChange2} />
              </label><br></br>

              <label>
              Form 3&nbsp;
              <input type="text" value={input3} onChange={handleChange3} />
              </label><br></br><br></br>

              <button onClick={handleSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Button
              </button>
          </form>
        }
      </Modal>

      <Group position="center">

        <Button
        onClick={() => setOpened(true)}
          styles={(theme) => ({
            root: {
              backgroundColor: '#00acee',
              color: 'black',
              border: 0,
              height: 41,
              paddingLeft: 20,
              paddingRight: 20,

              '&:hover': {
                backgroundColor: theme.fn.darken('#00acee', 0.05),
              },
            }
          })}
        >
        Placeholder button
      </Button>
      </Group>
    </div>
  );
}

export default Groups