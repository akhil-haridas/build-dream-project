import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "boxicons";

import ClientRoutes from "routes/clientRoutes";
import ProfessionalRoutes from "routes/professionalRoutes";
import ShopRoutes from "routes/shopsRoutes";
import AdminRoutes from "routes/adminRoutes";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/*" element={<ClientRoutes />} />
          <Route path="/professional/*" element={<ProfessionalRoutes />} />
          <Route path="/shop/*" element={<ShopRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
