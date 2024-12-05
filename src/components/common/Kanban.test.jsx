import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Kanban from "./Kanban";

import sectionApi from "../../api/sectionApi";
import taskApi from "../../api/taskApi";

const propsMock = {
  data: [
    {
      _id: "6750dff40ab6326d5c71544b",
      board: "6750dfec0ab6326d5c715441",
      title: "section 1",
      __v: 0,
      tasks: [
        {
          _id: "6750e0110ab6326d5c715468",
          section: {
            _id: "6750dff40ab6326d5c71544b",
            board: "6750dfec0ab6326d5c715441",
            title: "section 1",
            __v: 0,
            id: "6750dff40ab6326d5c71544b",
          },
          title: "task 1",
          content: "",
          position: 0,
          __v: 0,
          id: "6750e0110ab6326d5c715468",
        },
      ],
      id: "6750dff40ab6326d5c71544b",
    },
    {
      _id: "6750dfff0ab6326d5c715452",
      board: "6750dfec0ab6326d5c715441",
      title: "section 2",
      __v: 0,
      tasks: [
        {
          _id: "6750e0180ab6326d5c71546f",
          section: {
            _id: "6750dfff0ab6326d5c715452",
            board: "6750dfec0ab6326d5c715441",
            title: "section 2",
            __v: 0,
            id: "6750dfff0ab6326d5c715452",
          },
          title: "task 2",
          content: "",
          position: 0,
          __v: 0,
          id: "6750e0180ab6326d5c71546f",
        },
      ],
      id: "6750dfff0ab6326d5c715452",
    },
    {
      _id: "6750e00a0ab6326d5c71545d",
      board: "6750dfec0ab6326d5c715441",
      title: "section 3",
      __v: 0,
      tasks: [
        {
          _id: "6750e0200ab6326d5c715476",
          section: {
            _id: "6750e00a0ab6326d5c71545d",
            board: "6750dfec0ab6326d5c715441",
            title: "section 3",
            __v: 0,
            id: "6750e00a0ab6326d5c71545d",
          },
          title: "task 3",
          content: "",
          position: 0,
          __v: 0,
          id: "6750e0200ab6326d5c715476",
        },
      ],
      id: "6750e00a0ab6326d5c71545d",
    },
  ],
  boardId: "6750dfec0ab6326d5c715441",
};

describe("Testing Kanban component", () => {
  it("should render the component", async () => {
    const { debug } = render(<Kanban {...propsMock} />);
    //debug();
  });

  it("should create a new section", async () => {
    const Expected = {
      board: "6750dfec0ab6326d5c715441",
      title: "",
      _id: "123",
      __v: 0,
      tasks: [],
      id: "123",
    };

    jest.spyOn(sectionApi, "create").mockResolvedValue(Expected);
    jest
      .spyOn(sectionApi, "update")
      .mockResolvedValue({ ...Expected, title: "New section from tests" });

    const user = userEvent.setup();
    const { debug } = render(<Kanban {...propsMock} />);
    const addSection = screen.getByText("Add section");

    await user.click(addSection);
    const sectionTitle = await screen.findByTestId("123");
    await user.type(sectionTitle, "New section from tests");
  });
});
