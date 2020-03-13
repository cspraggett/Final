import React from "react";
import { Header , Button, Menu} from "grommet";
import { Home }from "grommet-icons";

export default function HeaderBar(props) {
  return (
    <Header background="brand">
      <Button icon={<Home />} hoverIndicator />
      <Menu label="account" items={[{ label: "logout" }]} />
    </Header>
  );
}
