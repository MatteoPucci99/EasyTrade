import { useState } from "react"


const StrategyFilter = (props)=>{
    const [query,setQuery] = useState('')
    props.setSearch(query)
    return (
        <div>

            <h3 className="darkthemeText" >Le mie strategie</h3>
            <form>
                <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder="Cerca . . ." />
            </form>
        </div>
    )
}

export default StrategyFilter