import Navbar from 'components/admin/Navbar/Navbar'
import Sidebar from 'components/admin/Sidebar/Sidebar';
import React from 'react'
import SubscriptionPage from 'components/admin/Subscription/Subscription';
const Subscriptions = () => {
  return (
    <>
      <Sidebar active={"Subscriptions"} />
      <section id="content">
        <Navbar />
        <SubscriptionPage />
      </section>
    </>
  );
}

export default Subscriptions