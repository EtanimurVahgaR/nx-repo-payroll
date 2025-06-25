-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "employeeCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "trade" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "dateOfJoining" TIMESTAMP(3),
    "dob" TIMESTAMP(3),
    "phoneNumber" TEXT,
    "address" TEXT,
    "aadharNumber" TEXT,
    "pan" TEXT,
    "bankName" TEXT,
    "ifscCode" TEXT,
    "accountNumber" TEXT,
    "fathersName" TEXT,
    "motherName" TEXT,
    "marriedStatus" TEXT,
    "spouseName" TEXT,
    "childrenName" TEXT,
    "uanNumber" TEXT,
    "gender" TEXT,
    "esicNumber" TEXT,
    "projectId" TEXT,
    "emergencyStatusNo" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "address" TEXT,
    "companyName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
