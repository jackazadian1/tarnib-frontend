// Import React and any necessary dependencies
import React, { useState } from 'react';
import Form from '../../../Forms/Form';

// Define a type for the component's props (if needed)
interface RoomPasswordProps {
  //room: Room
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>, passwordData: any ) => void
}

// Define the PlayerHand component
const RoomPassword: React.FC<RoomPasswordProps> = ({ handleFormSubmit}) => {

  const [formData, setFormData] = useState({ password: '' });

  return (
      <Form submitHandler={(e)=>handleFormSubmit(e,formData)}>
        <h2>Enter Password</h2>
        <p>This room is password protected. To access it's results, please enter the room's password.</p>
        <input
          type="text"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          name="password"
        />
        <button type="submit">Submit</button>
      </Form>


  );
};

// Export the PlayerHand component
export default RoomPassword;
