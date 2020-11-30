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
            <Link to="/dmn-editable">DMN Editable</Link>
          </li>
          <li>
            <Link to="/bpmn-editable">BPMN Editable</Link>
          </li>
          <li>
            <Link to="/bpmn-read-only">BPMN Read Only</Link>
          </li>
        </ul>
        <Switch>
          <Route
            exact={true}
            path="/dmn-read-only"
            render={() => (
              <DmnEditorComponent
                key="dmn-read-only"
                id="dmn-read-only"
                readOnly={true}
                initialContent={Promise.resolve("")}
              />
            )}
          />
          <Route
            exact={true}
            path="/dmn-editable"
            render={() => (
              <DmnEditorComponent
                key="dmn-editable"
                id="dmn-editable"
                readOnly={false}
                initialContent={Promise.resolve("")}
              />
            )}
          />
          <Route
            exact={true}
            path="/bpmn-read-only"
            render={() => (
              <BpmnEditorComponent
                key="bpmn-read-only"
                id="bpmn-read-only"
                readOnly={true}
                initialContent={Promise.resolve("")}
              />
            )}
          />
          <Route
            exact={true}
            path="/bpmn-editable"
            render={() => (
              <BpmnEditorComponent
                key="bpmn-editable"
                id="bpmn-editable"
                readOnly={false}
                initialContent={Promise.resolve("")}
              />
            )}
          />
        </Switch>
      </>
    </Router>
  );
};
