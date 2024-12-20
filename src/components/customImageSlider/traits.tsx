const AllTraits = (index: number) => {
  return [
    {
      type: "text",
      label: `Slide ${index + 1} Media Type`,
      name: `slide${index + 1}_media_type`,
      changeProp: true,
    },
    {
      type: "text",
      label: `Slide ${index + 1} Image`,
      name: `slide${index + 1}_image`,
      changeProp: true,
    },
    {
      type: "text",
      label: `Slide ${index + 1} Title`,
      name: `slide${index + 1}_title`,
      changeProp: true,
    },
    {
      type: "textarea",
      label: `Slide ${index + 1} Description`,
      name: `slide${index + 1}_description`,
      changeProp: true,
    },
    {
      type: "text",
      label: `Slide ${index + 1} Button`,
      name: `slide${index + 1}_button`,
      changeProp: true,
    },
    {
      type: "color",
      label: `Slide ${index + 1} Button Background Color`,
      name: `slide${index + 1}_button_background`,
      changeProp: true,
    },
    {
      type: "color",
      label: `Slide ${index + 1} text Color`,
      name: `slide${index + 1}_text_color`,
      changeProp: true,
    },
    {
      type: "text",
      label: `Slide ${index + 1}  Position`,
      name: `slide${index + 1}_position`,
      default: "center",
      changeProp: true,
    },
    {
      type: "text",
      label: `Slide ${index + 1}  Button2`,
      name: `slide${index + 1}_button2`,
      default: "center",
      changeProp: true,
    },
    {
      type: "text",
      label: `Slide ${index + 1} Button2 Background Color`,
      name: `slide${index + 1}_button2_background_color`,
      default: "center",
      changeProp: true,
    },
    {
      type: "text",
      label: `Slide ${index + 1} visible small section`,
      name: `slide${index + 1}_visible_small_section`,
      default: "Yes",
      changeProp: true,
    },
  ];
};

export default AllTraits;
