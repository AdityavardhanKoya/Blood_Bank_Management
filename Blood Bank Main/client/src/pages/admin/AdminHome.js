import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container p-3">
        <div className="d-felx flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3 className="mt-4">Manage Blood Bank App </h3>
          <hr />
          <p>
          Welcome, Administrator!
Empowering Lifesaving Connections Through Efficient Blood Bank Management

As the backbone of this life-saving ecosystem, your role is critical in ensuring that every drop of blood reaches those in need. This dashboard is designed to give you complete control over the blood donation process—from donor registration and screening to inventory management and emergency distribution. With real-time analytics, you can monitor blood stock levels, track expiration dates, and prioritize urgent requests to prevent shortages.

Hospitals and patients rely on your swift actions during emergencies. Your ability to manage donor databases, verify blood types, and coordinate logistics ensures that no time is wasted when lives are at stake. Beyond logistics, you foster trust in the system, encouraging more donors to step forward and contribute to this noble cause.

Every decision you make here has a ripple effect—turning compassion into action and despair into hope. Together, we’re not just managing a blood bank; we’re building a community of heroes, one donation at a time. Stay vigilant, stay proactive, and let’s continue saving lives with precision and care.

          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;