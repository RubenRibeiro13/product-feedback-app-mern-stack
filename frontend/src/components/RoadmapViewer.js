import {Link} from "react-router-dom";

const RoadmapViewer = props => {
    return (
        <section className="roadmap-viewer large-rounded-corners-element">
            <div className="roadmap-link-container row-flexbox-space-between">
                <h3>Roadmap</h3>
                <Link to="/roadmap" className="body-3">View</Link>
            </div>

            <ul>
                {["Planned", "In-Progress", "Live"].map((string, index) => {
                    return (
                        <li
                            key={index}
                            className="row-flexbox-space-between body-1"
                            style={{color: "#647196", marginBottom: string !== "Live" && "10px"}}
                        >
                            <div className="row-flexbox-flex-start" style={{gap: "15px"}}>
                                <div
                                    style={{
                                        background: string === "Planned" ? "#F49F85" : (
                                            string === "In-Progress" ? "#AD1FEA" : "#62BCFA"
                                        ),
                                        borderRadius: "50%",
                                        width: "8px",
                                        height: "8px"
                                    }}
                                />
                                <span>{string}</span>
                            </div>

                            <span style={{fontWeight: 700}}>
                                {string === "Planned" ? props.numberOfPlanned : (
                                    string === "In-Progress" ? props.numberOfInProgress : props.numberOfLive
                                )}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default RoadmapViewer;