import React, {Suspense} from "react";
import Preloader from "../components/Preloader/Preloader";

const withSuspense = (Component) => {
    return <Suspense fallback={<div>Download</div>}>
        <Component/>
    </Suspense>
}

export default withSuspense