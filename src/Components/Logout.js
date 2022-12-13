import React from "react";

export default function Logout() {

  window.localStorage.clear()

    return(
        window.open("/","_self")
    )
  


}
