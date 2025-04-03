// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract CertificateSystem {
    address public admin;

    struct Certificate {
        string studentName;
        string course;
        uint256 issueDate;
    }

    mapping(string => Certificate) private certificates;

    event CertificateIssued(string indexed certId, string studentName, string course, uint256 issueDate);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function issueCertificate(string memory certId, string memory studentName, string memory course) public onlyAdmin {
        require(certificates[certId].issueDate == 0, "Certificate ID already exists");
        certificates[certId] = Certificate(studentName, course, block.timestamp);
        emit CertificateIssued(certId, studentName, course, block.timestamp);
    }

    function verifyCertificate(string memory certId) public view returns (string memory, string memory, uint256) {
        Certificate memory cert = certificates[certId];
        require(cert.issueDate != 0, "Certificate not found");
        return (cert.studentName, cert.course, cert.issueDate);
    }
}
