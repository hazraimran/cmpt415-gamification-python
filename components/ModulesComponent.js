import { useContext } from 'react'
import Context from '../context/Context'
import RecentActivityComponent from './RecentActivityComponent'
import { parseModuleJson } from '../utilities/moduleParser'
import conditionalStatementsJson from '../modules/conditional_statements.json'
import OpenModuleComponent from './OpenModuleComponent'

function ModulesComponent() {
    const { openedModule, setOpenedModule } = useContext(Context)

    const handleModuleStart = (e) => {
        const module = e.currentTarget.getAttribute('module')
        let content;

        console.log(module)

        if (module === 'conditional_statements') {
            content = conditionalStatementsJson
        } else {
            return
        }

        const html = parseModuleJson(content)

        setOpenedModule({
            id: module,
            json: content,
            html: html
        })
    }

    if (openedModule) {
        return (
            <div className="container mx-auto" dangerouslySetInnerHTML={{__html: openedModule.html}}>
            </div>
        )
    } else {
        return (
            <div className="container mx-auto">
                <div className="row">
                    <div className="col">
                        <h3>Modules</h3>
                        <hr />
                        <div className="container">
                            <ul className="profile-modules-list">
                                <li>
                                    <div className="row">
                                        <div className="col-8">
                                            <span className="profile-modules-title">Conditional Statements</span>
                                            <span className="profile-modules-description">This module covers conditional statements.</span>
                                            <span className="profile-modules-progress">
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </span>
                                        </div>
                                        <div className="col modules-buttons">
                                            <br />
                                            <a href="#" className="btn btn-primary" module="conditional_statements" onClick={handleModuleStart}>Start</a>
                                            <a href="#" className="btn btn-primary disabled">Review</a>
                                            <a href="#" className="btn btn-primary disabled">Compete</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-3">
                        <RecentActivityComponent />
                    </div>
                </div>
            </div>
        )
    }
}

export default ModulesComponent