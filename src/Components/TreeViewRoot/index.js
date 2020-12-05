import * as React from 'react'
import SymbolPreview from "../../Components/SymbolPreview";
import SyntaxHighlighter from "../../Components/SyntaxHighlighter";

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default class TreeViewRoot extends React.Component {
    state = {
        selectedOptions: {},
        currentPath: ""
    }
    
    render = () => {
        return (
            <div>
                {this.props.data
                    ? <TreeList 
                        options={this.props.data}
                        onChange={(selectedOptions) => this.setState({selectedOptions})}
                        getSubContent={this.props.getSubContent}
                        selectedOptions={this.state.selectedOptions} 
                        level={0}
                        navigation={this.props.navigation}
                        currentPath={this.state.currentPath}
                        langName={this.props.langName}
                    />
                    : <div>Could not found data</div>
                }
            </div>
        )
    }
}

const TreeList = ({
    options,
    onChange,
    getSubContent,
    selectedOptions,
    level,
    navigation,
    currentPath,
    langName
}) => {
    const couldBeNested = (path) => {
        let pathArray = path.split('.')
        if (pathArray.length >= 2 && pathArray.length % 2 === 0) {
            let type = pathArray[pathArray.length - 2]
            switch (type) {
                case "class":
                case "union":
                case "struct":
                    return true
                default:
                    return false
            }
        }
        return false
    }

    const handleElementClicked = async (option) => {
        let currentTmpPath = currentPath + '.' + option.name
        let canBeNested = couldBeNested(currentTmpPath)

        if (level >= 1 && !option.subContent && canBeNested) {
            await getSubContent(option.id, currentTmpPath)
        } else if (level >= 1 && level % 2 === 1 && ((option.subContent && !option.subContent.length) || !canBeNested)) {
            window.location.assign(window.location.origin + '/symbol?id=' + option.id);
        } if (selectedOptions[option.id]){ // Is currently selected
            delete selectedOptions[option.id]; // Remove selected key from options list
        } else { // is not currently selected
            selectedOptions[option.id] = {} // Add selected key to optionsList
        }
        onChange(selectedOptions) // call onChange function given by parent
    }
    
    const handleSubOptionsListChange = (optionId, subSelections) => {
        selectedOptions[optionId] = subSelections;
        onChange(selectedOptions);
    }

    /* const getIndicator = (isSelected, hasNext) => { */
    const getIndicator = (option, selectedOptions) => {
        let isSelected = selectedOptions[option.id]
        let hasNext = option.subContent && option.subContent.length > 0
        
        if (isSelected && hasNext)
            return <KeyboardArrowDownIcon className="tree-view-page-icons"/>
        else if (hasNext)
            return <KeyboardArrowRightIcon className="tree-view-page-icons"/>
        else
            return <FiberManualRecordIcon className="tree-view-page-icons-small"/>
    }
    
    return (
        <div>
            {options.map(option => (
                <div key={option.id}>
                    <div className="tree-view-page-clickable" onClick={() => handleElementClicked(option, level)}>
                        <div style={{height: 'auto', display: 'flex', flexDirection: 'row', marginLeft: level * 32, marginBottom: 8, alignItems: 'center'}}>
                            {getIndicator(option, selectedOptions)}
                            <div className="symbol-page-parameter-name tree-view-page-code">
                                {
                                    option.type !== null ?
                                    <SymbolPreview className='symbol-page-parameter-name'
                                        displayName={option.path}
                                        to={option.id}
                                        lang={langName}
                                        prototype={option.name}
                                        type={option.type}
                                        mode={true}
                                    />
                                    :
                                    <SyntaxHighlighter code={option.name} lang={langName}/>
                                }
                                
                            </div>
                        </div>
                    </div>
                    {(option.subContent && option.subContent.length > 0 && selectedOptions[option.id]) &&
                        <TreeList
                            options={option.subContent}
                            onChange={(subSelections) => handleSubOptionsListChange(option.id, subSelections)}
                            getSubContent={getSubContent}
                            selectedOptions={selectedOptions[option.id]} 
                            level={level + 1}
                            currentPath={currentPath.length === 0 ? option.name : currentPath + '.' + option.name}
                            langName={langName}
                        />
                    }
                </div>
            ))}
        </div>
    )
}