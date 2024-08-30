// import React,{useState, useEffect} from 'react';
// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';

// function Ratings({conversation, setConversation, currentRatingIndex}) {
//   //console.log(conversation);
//   //console.log(currentRatingIndex);
//   let initialRating = conversation[currentRatingIndex].ratings; // this will ensure the updated ratings
//   const [value, setValue] = useState(initialRating);

//   const handleRatingsValue = (newValue) => {
//     setValue(newValue);
//     setConversation(prev => {
//         const updatedConversation = [...prev];
//         if (currentRatingIndex !== '' && conversation[currentRatingIndex]){
//           updatedConversation[currentRatingIndex] = {
//             ...updatedConversation[currentRatingIndex],
//             ratings: newValue
//           };
//         }
//         return updatedConversation;
//     })
//   }


  
//   return (
//     <Box sx={{ '& > legend': { mt: 2 } }}>
//       <Rating
//       name="size-small"
//       size="small"
//       // name="simple-controlled"
//       value={value}
//       onChange={(event, newValue) => handleRatingsValue(newValue)}/>
//     </Box>
//   );
// }


// export default Ratings;



import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

function Ratings({ conversation = [], setConversation, currentRatingIndex, readOnly = false }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (currentRatingIndex !== '' && conversation[currentRatingIndex]) {
      setValue(conversation[currentRatingIndex].ratings || 0);
    }
  }, [currentRatingIndex, conversation]);

  const handleRatingsValue = (newValue) => {
    setValue(newValue);
    if ( !readOnly) {
    setConversation( prev => {
      const updatedConversation = [...prev];
      if (currentRatingIndex !== '' && updatedConversation[currentRatingIndex]) {
        updatedConversation[currentRatingIndex] = {
          ...updatedConversation[currentRatingIndex],
          ratings: parseInt(newValue),
        };
      }
      
      return updatedConversation;
    });
  }
};

  
  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Rating
        name="size-small"
        size="small"
        value={value || 0 }
        // value={4}
        readOnly={readOnly}
        onChange={readOnly ? undefined : (event, newValue) => handleRatingsValue(newValue)}
        // onChange={(event, newValue) => handleRatingsValue(newValue)}
      />
    </Box>
  );
}

export default Ratings;



