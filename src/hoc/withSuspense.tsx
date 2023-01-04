import React, {Suspense} from "react";
import Preloader from "../components/Preloader/Preloader";

function withSuspense(Component:React.ComponentType) {
    return <Suspense fallback={<div>Download</div>}>
        <Component />
    </Suspense>
}

export default withSuspense