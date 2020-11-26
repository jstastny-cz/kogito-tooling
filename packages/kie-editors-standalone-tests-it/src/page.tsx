import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DmnEditorComponent, BpmnEditorComponent } from "@kogito-tooling/kie-editors-standalone-react-wrapper";

export const EditorPage: React.FC<{}> = () => {
  return (
    <Router>
      <>
        <ul>
          <li>
            <Link to="/dmn-read-only">DMN Read Only</Link>
          </li>
          <li>
            <Link to="/bpmn-read-only">BPMN Read Only</Link>
          </li>
        </ul>
        <Switch>
          <Route exact={true} path="/dmn-read-only">
            <DmnEditorComponent id="dmn-read-only" readOnly={true} initialContent={Promise.resolve("")} />
          </Route>
          <Route exact={true} path="/bpmn">
            <DmnEditorComponent id="bpmn" readOnly={true} initialContent={Promise.resolve("")} />
          </Route>
        </Switch>
      </>
    </Router>
  );
};
