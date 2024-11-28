import React, { useState } from "react";

import Header from "@/components/partials/Header";
import { Link } from "react-router-dom";
import Footer from "@/components/partials/Footer";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/DashboardLayout";
import CreateTourModal from "@/components/common/CreateTourModal";
import CreateTourLocation from "@/components/common/CreateTourLocation";


export default function Dashboard() {
  return (
    <>
      <main>
        <DashboardLayout >
            <div className="dashboard_header">
                <img src="/images/Frame 427321650.png" alt="" />
                <img src="/images/Frame 427321653.png" alt="" />
            </div>
        </DashboardLayout>
      </main>
    </>
  );
}