import { createMemo } from "solid-js";
import { css } from "solid-styled";
import { Button } from "$lib/components";
import { BoxContent } from "./BoxContent";
import type { Box } from "$stores";

interface BoxSetProps {
  box: Box;
  onBoxChange?: (box: Box) => void;
  onClose?: () => void;
}

export function BoxSet(props: BoxSetProps) {
  const dropdownColor = createMemo(() => (props.box.matchType === "Require" ? 111 : 0));

  const flipType = () => {
    props.onBoxChange?.({
      ...props.box,
      matchType: props.box.matchType === "Require" ? "Exclude" : "Require",
    });
  };

  css`
    .box {
      display: grid;
      padding: 20px 0;
      margin-bottom: 20px;
    }
    .dropdown-container {
      display: flex;
      justify-content: center;
      margin: -25px;
      z-index: 2;
    }
  `;

  return (
    <div class="box">
      <div class="dropdown-container">
        <Button onClick={flipType} hue={dropdownColor()}>
          {props.box.matchType}
        </Button>
      </div>

      <BoxContent
        name={props.box.name}
        data={props.box.data}
        hue={dropdownColor()}
        onClose={props.onClose}
        onNameChange={(name) => props.onBoxChange?.({ ...props.box, name } as Box)}
        onDataChange={(data) => props.onBoxChange?.({ ...props.box, data } as Box)}
      />
    </div>
  );
}
