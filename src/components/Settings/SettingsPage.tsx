import { Button } from "antd"
import { useImportDirectoryPatchMutation } from "api/enchanced/settings"
import { Tab } from "components/Common/Tab/Tab"
import { TabContentContainer } from "components/Common/Tab/Tab.styles"
import { TabHeader } from "components/Common/Tab/TabHeader"
import { useQueryResult } from "customHooks/useQueryResult";

export const SettingsPage = () => {
    const [ importDirectory, importDirectoryResult ] = useImportDirectoryPatchMutation();

    useQueryResult(importDirectoryResult);

    const onImport = () => {
        window.electron.ipcRenderer.selectFolder()
            .then(result => {
                if (!result){
                    return;
                }

                importDirectory({path: result});
            })
    }

    return (
        <Tab>
            <TabHeader title="Settings"/>
            <TabContentContainer>
                <Button onClick={onImport}>
                    Import legacy locations
                </Button>
            </TabContentContainer>
        </Tab>
    )
}