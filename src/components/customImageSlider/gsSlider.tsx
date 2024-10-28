import { Editor } from "grapesjs";
import { createRoot } from "react-dom/client";
import ImageSlider from "./sliderComponents";
import AllTraits from "./traits";
import { v4 as uuidv4 } from "uuid";
import {
  handleButtonBackgroundChangeHandler,
  handleButtonTextChangeHandler,
  handleDescriptionChangeHandler,
  handleImageChangeHandler,
  handleMediaTypeChangeHandler,
  handleTextColorChangeHandler,
  handleTitleChangeHandler,
} from "./sliderChangeHandler";

export interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonBackgroundColor: string;
  textColor: string;
  mediaType: string;
}

const GsSlider = (editor: Editor) => {
  const LOCAL_STORAGE_KEY = "gjs-Data";

  const defaultSlides: Slide[] = [
    {
      image:
        "https://www.anniesannuals.com/cdn-cgi/image//https://storage.anniesannuals.com/annies/1/store/5/images/main-page-banner-01.jpg",
      title: "Default Slide 1",
      description: "Description",
      buttonText: "Button",
      buttonBackgroundColor: "white",
      textColor: "white",
      mediaType: "image",
    },
  ];

  const updateSliderDataInLocalStorage = (
    id: string,
    newSliderData: Slide[]
  ) => {
    const sliderData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const data = sliderData ? JSON.parse(sliderData) : [];

    const updatedData = data.map((component: any) => {
      if (component.attributes.id === id) {
        return {
          ...component,
          attributes: {
            ...component.attributes,
            slides: newSliderData,
          },
        };
      }
      return component;
    });

    if (!updatedData.find((component: any) => component.attributes.id === id)) {
      updatedData.push({ attributes: { id, slides: newSliderData } });
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
  };

  editor.Components.addType("custom-slider", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: true,
        editable: true,

        attributes: {
          slides: defaultSlides,
          id: uuidv4(),
        },
        traits: [
          {
            type: "button",
            label: "Add Slide",
            name: "add_slide",
            command: "add-slide",
            text: "Add Slide",
          },
        ],
      },
      init() {
        this.listenTo(this, "change:attributes", this.updateSlider);
        editor.Commands.add("add-slide", () => {
          this.addSlide();
        });
        this.loadSliderData();
        this.addSlideTraits(0);
      },
      updateSlider() {
        const attributes = this.get("attributes");
        const slides = attributes ? attributes.slides : defaultSlides;
        this.trigger("slides:updated", slides);
        this.saveSliderData(slides);
      },
      addSlide() {
        const attributes = this.get("attributes");
        const slides = attributes ? attributes.slides : defaultSlides;
        slides.push({
          image: "",
          title: "",
          description: "",
          buttonText: "",
          buttonBackgroundColor: "",
          textColor: "",
          mediaType: "image",
        });
        this.set("attributes", { slides });

        this.addSlideTraits(slides.length - 1);
      },
      addSlideTraits(index: number) {
        const traits = AllTraits(index);

        this.addTrait(traits);

        this.on(`change:slide${index + 1}_media_type`, (model, value) => {
          handleMediaTypeChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });

        this.on(`change:slide${index + 1}_image`, (model, value) => {
          handleImageChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });

        this.on(`change:slide${index + 1}_title`, (model, value) => {
          handleTitleChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });

        this.on(`change:slide${index + 1}_description`, (model, value) => {
          handleDescriptionChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });
        this.on(`change:slide${index + 1}_button`, (model, value) => {
          handleButtonTextChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });
        this.on(
          `change:slide${index + 1}_button_background`,
          (model, value) => {
            handleButtonBackgroundChangeHandler(
              model,
              value,
              index,
              defaultSlides
            );
            model.updateSlider();
          }
        );
        this.on(`change:slide${index + 1}_text_color`, (model, value) => {
          handleTextColorChangeHandler(model, value, index, defaultSlides);
          model.updateSlider();
        });
      },

      saveSliderData(slides: Slide[]) {
        const attribute = this.get("attributes");
        const id = attribute ? attribute.id : [];

        updateSliderDataInLocalStorage(id, slides);
      },
      loadSliderData() {
        const attributes = this.get("attributes");
        const id = attributes ? attributes.id : null;

        if (id) {
          const savedSlides = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (savedSlides) {
            const data = JSON.parse(savedSlides);
            const sliderComponent = data.find(
              (comp: any) => comp.attributes.id === id
            );
            const slides = sliderComponent
              ? sliderComponent.attributes.slides
              : defaultSlides;
            this.set("attributes", { slides });
            slides.forEach((_: Slide, index: number) => {
              this.addSlideTraits(index);
            });
          }
        }
      },
    },
    view: {
      onRender({ el, model }) {
        const root = createRoot(el);
        const attributes = model.get("attributes");
        const slides = attributes ? attributes.slides : defaultSlides;

        root.render(<ImageSlider slides={slides} />);

        model.on("slides:updated", (slides) => {
          root.render(<ImageSlider slides={slides} />);
        });

        const addButton = el.querySelector(
          'button[name="add_slide"]'
        ) as HTMLButtonElement;
        if (addButton) {
          addButton.innerText = "Add Slide";
          addButton.onclick = () => {
            model.trigger("change:add_slide");
          };
        }
      },
    },
  });

  editor.BlockManager.add("slider", {
    label: "Slider",
    attributes: { class: "fa fa-sliders " },
    category: "React-component",
    content: { type: "custom-slider" },
  });
};

export default GsSlider;
